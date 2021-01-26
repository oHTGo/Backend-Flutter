const mockRequest: any = (
  body: Record<string, unknown>,
  currentUser: Record<string, unknown>,
  Params: Record<string, unknown>
) => {
  return {body: body, currentUser: currentUser, params: Params};
};

const mockResponse: any = {
  status: jest.fn(() => mockResponse),
  json: jest.fn((res) => res)
};

const mockNext: any = jest.fn((error) => error);

export {mockRequest, mockResponse, mockNext};
