export interface CancelPromise<T> extends Promise<T> {
    cancel?: () => void;
}