import { Response, Request, NextFunction } from 'express';
class IError extends Error {
    constructor(public message: string, public statusCode?: number) {
        super(message);
        this.statusCode = statusCode;
    }
}
export const notFound = (req: Request, res: Response, next: NextFunction) => {
    const error: IError = new IError(`Route not found: ${req.originalUrl}`);
    error.statusCode = 404;
    res.status(404);
    next(error);
};
export const errorHandler = (
    error: IError,
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction,
) => {
    const statusCode = error.statusCode ? error.statusCode : 500;
    if (error.statusCode) {
        res.status(error?.statusCode);
    } else {
        res.status(statusCode);
    }
    const responseError = {
        status: statusCode,
        message: error.message,
        stack: error?.stack,
    };

    if (process.env.BUILD_MODE !== 'development') delete responseError.stack;
    return res.json(responseError);
};
