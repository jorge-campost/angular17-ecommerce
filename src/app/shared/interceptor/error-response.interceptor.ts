import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { catchError, throwError } from "rxjs";

export const htppErrorResponseInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
    return next(req).pipe(catchError(handleErrorResponse));
}

function handleErrorResponse(error: HttpErrorResponse): ReturnType<typeof throwError> {
    const errorResponse = `Error code: ${error.status}, message: ${error.message}`;
    return throwError(() => errorResponse);
};