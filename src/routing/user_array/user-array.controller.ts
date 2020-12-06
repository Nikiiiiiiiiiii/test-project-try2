import {IUserArrayService} from "./interfaces/user-array.service.interface";
import {Request, Response} from "express";

export class UserArrayController {

    constructor(private readonly userArrayService: IUserArrayService) {
        this.calc = this.calc.bind(this)
        this.root = this.root.bind(this)
    }

    public async root(req: Request, res: Response) {
        res.render('index')
    }

    public async calc(req: Request, res: Response) {
        const result = await this.userArrayService.create(req.body.title.trim().split(' ').map(parseFloat))
        res.render('index', {
            array: result.join(' ')
        })
    }

}
