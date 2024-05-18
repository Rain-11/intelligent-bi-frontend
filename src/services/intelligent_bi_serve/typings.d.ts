declare namespace API {
  type BaseResponseBoolean = {
    code?: number;
    data?: boolean;
    message?: string;
  };

  type BaseResponseDataAnalysisVo = {
    code?: number;
    data?: DataAnalysisVo;
    message?: string;
  };

  type BaseResponseInteger = {
    code?: number;
    data?: number;
    message?: string;
  };

  type BaseResponseLoginUserVO = {
    code?: number;
    data?: LoginUserVO;
    message?: string;
  };

  type BaseResponseLong = {
    code?: number;
    data?: number;
    message?: string;
  };

  type BaseResponsePageChartVo = {
    code?: number;
    data?: PageChartVo;
    message?: string;
  };

  type BaseResponsePageUser = {
    code?: number;
    data?: PageUser;
    message?: string;
  };

  type BaseResponsePageUserVO = {
    code?: number;
    data?: PageUserVO;
    message?: string;
  };

  type BaseResponseUser = {
    code?: number;
    data?: User;
    message?: string;
  };

  type BaseResponseUserVO = {
    code?: number;
    data?: UserVO;
    message?: string;
  };

  type BaseResponseVoid = {
    code?: number;
    data?: Record<string, any>;
    message?: string;
  };

  type ChangePasswordDto = {
    userPassword?: string;
    verifyPassword?: string;
    verificationCode?: string;
  };

  type ChartAddDto = {
    goal?: string;
    name?: string;
    chartData?: string;
    chartType?: string;
    genChart?: string;
    genResult?: string;
  };

  type ChartAnalysisDto = {
    goal?: string;
    name?: string;
    chartType?: string;
  };

  type ChartQueryDto = {
    current?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    id?: number;
    name?: string;
    goal?: string;
    chartType?: string;
    userId?: number;
  };

  type ChartSearchNameAndGoalDto = {
    current?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    name?: string;
    goal?: string;
  };

  type ChartUpdateDto = {
    id?: number;
    name?: string;
    goal?: string;
    chartData?: string;
    chartType?: string;
    genChart?: string;
    genResult?: string;
  };

  type ChartVo = {
    id?: number;
    goal?: string;
    chartData?: string;
    chartType?: string;
    name?: string;
    genChart?: string;
    userId?: number;
    genResult?: string;
    updateTime?: string;
    createTime?: string;
    status?: number;
    executionInformation?: string;
  };

  type DataAnalysisVo = {
    option?: string;
    result?: string;
  };

  type DeleteRequest = {
    id?: number;
  };

  type ForgotPasswordDto = {
    email?: string;
    userPassword?: string;
    verificationCode?: string;
  };

  type getUserByIdParams = {
    id: number;
  };

  type getUserVOByIdParams = {
    id: number;
  };

  type LoginUserVO = {
    id?: number;
    userName?: string;
    userAvatar?: string;
    userProfile?: string;
    userRole?: string;
    createTime?: string;
    updateTime?: string;
  };

  type obtainAnalysisResultsAsyncMQParams = {
    chartAnalysisDto: ChartAnalysisDto;
  };

  type obtainAnalysisResultsAsyncParams = {
    chartAnalysisDto: ChartAnalysisDto;
  };

  type obtainAnalysisResultsParams = {
    chartAnalysisDto: ChartAnalysisDto;
  };

  type OrderItem = {
    column?: string;
    asc?: boolean;
  };

  type PageChartVo = {
    records?: ChartVo[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: boolean;
    searchCount?: boolean;
    optimizeJoinOfCountSql?: boolean;
    countId?: string;
    maxLimit?: number;
    pages?: number;
  };

  type PageUser = {
    records?: User[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: boolean;
    searchCount?: boolean;
    optimizeJoinOfCountSql?: boolean;
    countId?: string;
    maxLimit?: number;
    pages?: number;
  };

  type PageUserVO = {
    records?: UserVO[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: boolean;
    searchCount?: boolean;
    optimizeJoinOfCountSql?: boolean;
    countId?: string;
    maxLimit?: number;
    pages?: number;
  };

  type sendVerificationCodeParams = {
    email: string;
  };

  type User = {
    id?: number;
    userPassword?: string;
    userName?: string;
    userAvatar?: string;
    email?: string;
    userProfile?: string;
    userRole?: string;
    createTime?: string;
    updateTime?: string;
    isDelete?: number;
  };

  type UserAddRequest = {
    userName?: string;
    email?: string;
    userAvatar?: string;
    userRole?: string;
  };

  type UserLoginEmailRequest = {
    email?: string;
    verificationCode?: string;
  };

  type UserLoginRequest = {
    email?: string;
    userPassword?: string;
  };

  type UserQueryRequest = {
    current?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    id?: number;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserRegisterRequest = {
    email?: string;
    userPassword?: string;
    verificationCode?: string;
  };

  type UserUpdateMyRequest = {
    userName?: string;
    userAvatar?: string;
    userProfile?: string;
  };

  type UserUpdateRequest = {
    id?: number;
    userName?: string;
    userAvatar?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserVO = {
    id?: number;
    userName?: string;
    userAvatar?: string;
    userProfile?: string;
    userRole?: string;
    createTime?: string;
  };
}
