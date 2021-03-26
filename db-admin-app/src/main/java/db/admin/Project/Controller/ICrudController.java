package db.admin.Project.Controller;

import java.util.List;

public interface ICrudController<T> {
	
    List<T> findAll();
    
    T save(T model);
    
    T update(String name, T model);

    void delete(long id);
}
