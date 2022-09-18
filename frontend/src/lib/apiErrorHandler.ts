export class ErrorHandler {
    next: ErrorHandler | null;

    constructor() {
        this.next = null;
    }

    setNext(next: ErrorHandler) {
        this.next = next;
    }

    putError(error: any): any {
        if (this.beAbleToHandle(error)) {
            return this.handle(error)
        } else if (this.next != null) {
            return this.next.putError(error);
        } else {
            console.log("error", error);
        }
    }

    beAbleToHandle(error: any): boolean {
        throw new Error("beAbleToHandle を実装してください");
    }

    handle(error: any) {
        throw new Error("handle を実装してください");
    }
}

export class SingleErrorMessage {
    message: string

    constructor(message: string) {
        this.message = message
    }
}

// type FormError=string[]

type FieldError = { [key: string]: string[] | FieldError[] }

export class FormErrors {
    errors: FieldError[]

    constructor(errors: FieldError[]) {
        this.errors = errors
    }
}

export class SimpleErrorHandler extends ErrorHandler {
    beAbleToHandle(error: any): boolean {
        const detail = error?.response?.data?.detail;
        return !!detail && (typeof detail) === "string";
    }

    handle(error: any): SingleErrorMessage {
        return new SingleErrorMessage(error.response.data.detail);
    }
}

export class FieldErrorHandler extends ErrorHandler {
    beAbleToHandle(error: any): boolean {
        const data = error?.response?.data;
        const detail = error?.response?.data?.detail;
        if (!data || !!Array.isArray(data)) return false;
        if (!!detail) return false;
        const dataType = typeof data;
        return dataType === "object";
    }

    handle(error: any): FormErrors {
        return new FormErrors(error!.response!.data!);
    }
}

// TODO: chainする意味ないため、中央集中型のハンドラーを作り、各ハンドラーに問い合わせる形に変更する
const simpleErrorHandler = new SimpleErrorHandler();
const fieldErrorHandler = new FieldErrorHandler();
simpleErrorHandler.setNext(fieldErrorHandler)

export const apiErrorHandler = simpleErrorHandler
