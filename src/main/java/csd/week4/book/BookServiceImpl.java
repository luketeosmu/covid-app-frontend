package csd.week4.book;

import java.util.List;
import org.springframework.stereotype.Service;


@Service
public class BookServiceImpl implements BookService {
   
    private BookRepository books;
    

    public BookServiceImpl(BookRepository books){
        this.books = books;
    }

    @Override
    public List<Book> listBooks() {
        return books.findAll();
    }

    
    @Override
    public Book getBook(Long id){
        // Using Java Optional, as "findById" of Spring JPA returns an Optional object
        // Optional forces developers to explicitly handle the case of non-existent values
        // Here is an implementation using lambda expression to extract the value from Optional<Book>
        return books.findById(id).map(book -> {
            return book;
        }).orElse(null);
    }
    
    @Override
    public Book addBook(Book book) {
        return books.save(book);
    }
    
    @Override
    public Book updateBook(Long id, Book newBookInfo){
        return books.findById(id).map(book -> 
            {book.setTitle(newBookInfo.getTitle());
                return books.save(book);
            }).orElse(null);

        /*
        // You can also handle Optional objects in this way
        //
        Optional<Book> b = books.findById(id);
        if (b.isPresent()){
            Book book = b.get();
            book.setTitle(newBookInfo.getTitle());
            return books.save(book);
        }else
            return null;*/
    }

    /**
     * Remove a book with the given id
     * Spring Data JPA does not return a value for delete operation
     * Cascading: removing a book will also remove all its associated reviews
     */
    @Override
    public void deleteBook(Long id){
        books.deleteById(id);
    }
}