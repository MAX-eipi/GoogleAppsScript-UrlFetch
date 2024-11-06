class UrlFetchResult {
    public static createErrorResult(error: Error): UrlFetchResult {
        const result = new UrlFetchResult;
        result.errors = [this.toErrorMessage(error)];
        return result;
    }

    public static toErrorMessage(error: Error): string {
        return `[Message]
${error.message}

[Stack Trace]
${error.stack}`;
    }

    public errors: string[] = [];
    public get hasError(): boolean {
        return this.errors && this.errors.length > 0;
    }
}
