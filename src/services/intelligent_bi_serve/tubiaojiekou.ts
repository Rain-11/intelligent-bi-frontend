// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /chart/addChart */
export async function addChart(body: API.ChartAddDto, options?: { [key: string]: any }) {
  return request<API.BaseResponseVoid>('/chart/addChart', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 DELETE /chart/deleteChart */
export async function deleteChart(body: API.DeleteRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseVoid>('/chart/deleteChart', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /chart/listChart */
export async function listChart(body: API.ChartQueryDto, options?: { [key: string]: any }) {
  return request<API.BaseResponsePageChartVo>('/chart/listChart', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /chart/obtainAnalysisResults */
export async function obtainAnalysisResults(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.obtainAnalysisResultsParams,
  body: {},
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseDataAnalysisVo>('/chart/obtainAnalysisResults', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      ...params,
      chartAnalysisDto: undefined,
      ...params['chartAnalysisDto'],
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /chart/obtainAnalysisResultsAsync */
export async function obtainAnalysisResultsAsync(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.obtainAnalysisResultsAsyncParams,
  body: {},
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseVoid>('/chart/obtainAnalysisResultsAsync', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      ...params,
      chartAnalysisDto: undefined,
      ...params['chartAnalysisDto'],
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /chart/searchChartByNameAndGoal */
export async function searchChartByNameAndGoal(
  body: API.ChartSearchNameAndGoalDto,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageChartVo>('/chart/searchChartByNameAndGoal', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /chart/updateChart */
export async function updateChart(body: API.ChartUpdateDto, options?: { [key: string]: any }) {
  return request<API.BaseResponseVoid>('/chart/updateChart', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
