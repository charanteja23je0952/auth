class AppError extends Error {
    statusCode;
    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
    }
}

export default AppError;
