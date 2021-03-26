package db.admin.Project.Service;

import java.util.List;

import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

public interface ICrudService<T> {

	@Transactional(propagation = Propagation.SUPPORTS)
	public List<T> findAllTables();

	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public T createModel(T model);

	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public T updateModel(String prevModelName,T nextModel);

	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void deleteModel(long id);
}
