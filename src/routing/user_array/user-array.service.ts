import {IUserArrayService} from "./interfaces/user-array.service.interface";
import {SortService} from "./sort.service";
import {getConnection, getManager} from "typeorm";
import {Arr} from "./entity/array";
import {Data} from "./entity/data";

export class UserArrayService implements IUserArrayService {

    constructor(private readonly sortService: SortService) {}

    public async create(array: Array<number>): Promise<Array<number>> {

        let lastSortId = await getManager()
            .query(`SELECT MAX(sortid) FROM public.data`) // Получаем id последней сортировки в бд

        const result = await this.sortService.bubbleSort(array)

        lastSortId[0].max === null ? lastSortId = 1 : lastSortId = lastSortId[0].max + 1 // Если сортировок ещё не было, указываем, что это первая, иначе приводим полученное значение к удобному виду

        await Data.create({
            sortid: lastSortId
        }).save()

        for (let j = 0; j < result.length; j++) {
            await Arr.create({
                el: result[j],
                data: lastSortId
            }).save()
        }

        return result
    }

    // public async find(sortid: number): Promise<any> { // Поиск элементов по id сортировки(Если понадобится)
    //     return await getConnection()
    //         .getRepository(Data)
    //         .createQueryBuilder("data")
    //         .leftJoinAndSelect("data.array", "arr")
    //         .where("data.sortid = :sortid", { sortid })
    //         .getOne()
    // }
}