export interface IUserArrayService {
    create(array: Array<number>): Promise<Array<number>>
    // find(sortId: number): Promise<Array<number>>
}
