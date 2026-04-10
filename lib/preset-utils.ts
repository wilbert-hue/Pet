/**
 * Utility functions for Filter Presets
 * Handles dynamic calculation of top regions and segments
 */

import type { ComparisonData, DataRecord, FilterState } from './types'

/**
 * Calculate top segments by market value for a given segment type and year.
 * Falls back to geographic grouping if multiple geographies exist.
 */
export function getTopSegmentsByValue(
  data: ComparisonData | null,
  segmentType: string,
  year: number,
  topN: number = 3
): string[] {
  if (!data) return []

  const records = data.data.value.geography_segment_matrix
  const segmentTotals = new Map<string, number>()

  records.forEach((record: DataRecord) => {
    if (record.segment_type !== segmentType) return
    const seg = record.segment
    if (!seg) return
    const value = record.time_series[year] || 0
    segmentTotals.set(seg, (segmentTotals.get(seg) || 0) + value)
  })

  return Array.from(segmentTotals.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, topN)
    .map(([seg]) => seg)
}

/**
 * Calculate top segments by CAGR for a given segment type.
 */
export function getTopSegmentsByCAGR(
  data: ComparisonData | null,
  segmentType: string,
  topN: number = 3
): string[] {
  if (!data) return []

  const records = data.data.value.geography_segment_matrix
  const segmentCAGRs = new Map<string, number[]>()

  records.forEach((record: DataRecord) => {
    if (record.segment_type !== segmentType) return
    const seg = record.segment
    if (!seg) return
    if (record.cagr !== undefined && record.cagr !== null) {
      const arr = segmentCAGRs.get(seg) || []
      arr.push(record.cagr)
      segmentCAGRs.set(seg, arr)
    }
  })

  // If no CAGR values, compute from time_series
  if (segmentCAGRs.size === 0) {
    const startYear = data.metadata.start_year
    const endYear = data.metadata.forecast_year
    const years = endYear - startYear

    records.forEach((record: DataRecord) => {
      if (record.segment_type !== segmentType) return
      const seg = record.segment
      if (!seg) return
      const startVal = record.time_series[startYear]
      const endVal = record.time_series[endYear]
      if (startVal && endVal && years > 0) {
        const cagr = Math.pow(endVal / startVal, 1 / years) - 1
        segmentCAGRs.set(seg, [cagr])
      }
    })
  }

  return Array.from(segmentCAGRs.entries())
    .map(([seg, cagrs]) => ({ seg, avg: cagrs.reduce((a, b) => a + b, 0) / cagrs.length }))
    .sort((a, b) => b.avg - a.avg)
    .slice(0, topN)
    .map(({ seg }) => seg)
}

/**
 * Calculate top regions/geographies based on market value for a specific year.
 * Returns geographies if multiple exist, otherwise returns segments.
 */
export function getTopRegionsByMarketValue(
  data: ComparisonData | null,
  year: number = 2025,
  topN: number = 3
): string[] {
  if (!data) return []

  const records = data.data.value.geography_segment_matrix
  const geographyTotals = new Map<string, number>()

  records.forEach((record: DataRecord) => {
    const geography = record.geography
    if (geography === 'Global') return
    const value = record.time_series[year] || 0
    geographyTotals.set(geography, (geographyTotals.get(geography) || 0) + value)
  })

  return Array.from(geographyTotals.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, topN)
    .map(([geography]) => geography)
}

/**
 * Get all first-level segments for a given segment type.
 * For flat (non-hierarchical) segment types, returns all items.
 */
export function getFirstLevelSegments(
  data: ComparisonData | null,
  segmentType: string
): string[] {
  if (!data) return []

  const segmentDimension = data.dimensions.segments[segmentType]
  if (!segmentDimension) return []

  const hierarchy = segmentDimension.hierarchy || {}
  const allSegments = segmentDimension.items || []

  // If no hierarchy exists, return all items directly (flat segment type)
  if (Object.keys(hierarchy).length === 0) {
    return [...allSegments]
  }

  const allChildren = new Set(Object.values(hierarchy).flat())
  const firstLevelSegments: string[] = []

  Object.keys(hierarchy).forEach(parent => {
    if (!allChildren.has(parent) && hierarchy[parent].length > 0) {
      firstLevelSegments.push(parent)
    }
  })

  allSegments.forEach(segment => {
    if (!allChildren.has(segment) && !hierarchy[segment]) {
      firstLevelSegments.push(segment)
    }
  })

  return firstLevelSegments.sort()
}

/**
 * Get the first available segment type from the data
 */
export function getFirstSegmentType(data: ComparisonData | null): string | null {
  if (!data || !data.dimensions.segments) return null
  const segmentTypes = Object.keys(data.dimensions.segments)
  return segmentTypes.length > 0 ? segmentTypes[0] : null
}

/**
 * Calculate top regions based on CAGR
 */
export function getTopRegionsByCAGR(
  data: ComparisonData | null,
  topN: number = 2
): string[] {
  if (!data) return []

  const records = data.data.value.geography_segment_matrix
  const geographyCAGRs = new Map<string, number[]>()

  records.forEach((record: DataRecord) => {
    const geography = record.geography
    if (geography === 'Global') return
    if (record.cagr !== undefined && record.cagr !== null) {
      const cagrs = geographyCAGRs.get(geography) || []
      cagrs.push(record.cagr)
      geographyCAGRs.set(geography, cagrs)
    }
  })

  return Array.from(geographyCAGRs.entries())
    .map(([geography, cagrs]) => ({
      geography,
      avgCAGR: cagrs.reduce((a, b) => a + b, 0) / cagrs.length
    }))
    .sort((a, b) => b.avgCAGR - a.avgCAGR)
    .slice(0, topN)
    .map(item => item.geography)
}

/**
 * Calculate top countries based on CAGR
 */
export function getTopCountriesByCAGR(
  data: ComparisonData | null,
  topN: number = 5
): string[] {
  return getTopRegionsByCAGR(data, topN)
}

/**
 * Detect whether the dataset has a single geography (e.g. U.S. only)
 */
function isSingleGeography(data: ComparisonData | null): boolean {
  if (!data) return false
  const geos = data.dimensions.geographies.all_geographies || []
  return geos.length <= 1
}

/**
 * Create dynamic filter configuration for Top Market preset.
 * - Multi-geo: top 3 geographies by value
 * - Single-geo: top 3 segments by value from first segment type
 */
export function createTopMarketFilters(data: ComparisonData | null): Partial<FilterState> {
  const startYear = data?.metadata?.start_year ?? 2025
  const endYear = data?.metadata?.forecast_year ?? 2033
  const firstSegmentType = getFirstSegmentType(data)

  if (isSingleGeography(data)) {
    const topSegments = firstSegmentType
      ? getTopSegmentsByValue(data, firstSegmentType, startYear, 3)
      : []
    const allGeos = data?.dimensions.geographies.all_geographies || []
    return {
      viewMode: 'segment-mode',
      geographies: allGeos,
      segments: topSegments,
      segmentType: firstSegmentType || 'By Customer Type',
      yearRange: [startYear, endYear],
      dataType: 'value'
    }
  }

  const topRegions = getTopRegionsByMarketValue(data, startYear, 3)
  const firstLevelSegments = firstSegmentType
    ? getFirstLevelSegments(data, firstSegmentType)
    : []
  return {
    viewMode: 'geography-mode',
    geographies: topRegions,
    segments: firstLevelSegments,
    segmentType: firstSegmentType || 'By Customer Type',
    yearRange: [startYear, endYear],
    dataType: 'value'
  }
}

/**
 * Create dynamic filter configuration for Growth Leaders preset.
 * - Multi-geo: top 2 geographies by CAGR
 * - Single-geo: top 3 segments by CAGR from first segment type
 */
export function createGrowthLeadersFilters(data: ComparisonData | null): Partial<FilterState> {
  const startYear = data?.metadata?.start_year ?? 2025
  const endYear = data?.metadata?.forecast_year ?? 2033
  const firstSegmentType = getFirstSegmentType(data)

  if (!data) return { viewMode: 'segment-mode', yearRange: [startYear, endYear], dataType: 'value' }

  if (isSingleGeography(data)) {
    const topSegments = firstSegmentType
      ? getTopSegmentsByCAGR(data, firstSegmentType, 3)
      : []
    const allGeos = data.dimensions.geographies.all_geographies || []
    return {
      viewMode: 'segment-mode',
      geographies: allGeos,
      segments: topSegments,
      segmentType: firstSegmentType || 'By Customer Type',
      yearRange: [startYear, endYear],
      dataType: 'value'
    }
  }

  const topRegions = getTopRegionsByCAGR(data, 2)
  const firstLevelSegments = firstSegmentType
    ? getFirstLevelSegments(data, firstSegmentType)
    : []
  return {
    viewMode: 'geography-mode',
    geographies: topRegions,
    segments: firstLevelSegments,
    segmentType: firstSegmentType || 'By Customer Type',
    yearRange: [startYear, endYear],
    dataType: 'value'
  }
}

/**
 * Create dynamic filter configuration for Emerging Markets preset.
 * - Multi-geo: top 5 countries by CAGR
 * - Single-geo: show "By Region" segment breakdown (regional sub-markets)
 */
export function createEmergingMarketsFilters(data: ComparisonData | null): Partial<FilterState> {
  const startYear = data?.metadata?.start_year ?? 2025
  const endYear = data?.metadata?.forecast_year ?? 2033

  if (!data) return { viewMode: 'segment-mode', yearRange: [startYear, endYear], dataType: 'value' }

  if (isSingleGeography(data)) {
    const allGeos = data.dimensions.geographies.all_geographies || []
    // Use "By Region" segment type if available, otherwise fall back to first segment type
    const regionSegType = Object.keys(data.dimensions.segments).find(t =>
      t.toLowerCase().includes('region')
    ) || getFirstSegmentType(data)
    const regionSegments = regionSegType
      ? getFirstLevelSegments(data, regionSegType)
      : []
    return {
      viewMode: 'segment-mode',
      geographies: allGeos,
      segments: regionSegments,
      segmentType: regionSegType || 'By Region',
      yearRange: [startYear, endYear],
      dataType: 'value'
    }
  }

  const topCountries = getTopCountriesByCAGR(data, 5)
  const firstSegmentType = getFirstSegmentType(data)
  const firstLevelSegments = firstSegmentType
    ? getFirstLevelSegments(data, firstSegmentType)
    : []
  return {
    viewMode: 'geography-mode',
    geographies: topCountries,
    segments: firstLevelSegments,
    segmentType: firstSegmentType || 'By Customer Type',
    yearRange: [startYear, endYear],
    dataType: 'value'
  }
}
