import express, { Request, Response } from 'express';
import BookService  from '../service/bookService';

const router = express.Router();


router.post('/',(req: Request, res: Response) => {
    let bookService = new BookService();
    bookService.insertBook(req , res);
});

router.get("/" , (req: Request, res: Response) =>{
    let bookService = new BookService();
    bookService.getAllBook(req , res);
})

router.get("/filter" ,(req: Request, res: Response) =>{
    let bookService = new BookService();
    bookService.filterBook(req , res);
})

router.get("/:id" , (req: Request, res: Response) =>{
    let bookService = new BookService();
    bookService.getBookById(req , res);
})

router.put("/" , (req: Request, res: Response) =>{
    let bookService = new BookService();
    bookService.updateBooks(req , res);
})

router.delete("/:id" , (req: Request, res: Response) =>{
    let bookService = new BookService();
    bookService.deleteBooks(req , res);
})

router.post("/importBook" , (req: Request, res: Response) =>{
    let bookService = new BookService();
    bookService.importBook(req , res);
})


export default router;
