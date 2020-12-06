import {ISortService} from "./interfaces/sort.service.interface";

export class SortService implements ISortService {

    bubbleSort(arr: Array<number>): Array<number> {

        for (let i = 0, endI = arr.length - 1; i < endI; i++) {

            let wasSwap: boolean = false // Чтобы избежать лишних итераций, если массив уже отсортирован

            for (let j = 0, endJ = endI - i; j < endJ; j++) {

                if (arr[j] > arr[j + 1]) {

                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                    wasSwap = true
                }
            }

            if (!wasSwap) break;
        }
        return arr
    };
}