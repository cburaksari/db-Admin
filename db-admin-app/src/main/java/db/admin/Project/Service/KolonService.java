package db.admin.Project.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import db.admin.Project.Models.Kolon;
import db.admin.Project.Repository.KolonRepository;

@Service
public class KolonService implements ICrudService<Kolon> {

	@Autowired
	private KolonRepository _kolonRepo;

	@Override
	public List<Kolon> findAllTables() {
		List<Kolon> kolonList = null;
		try {
			kolonList = _kolonRepo.findAll();
		} catch (RuntimeException e) {
			throw new RuntimeException("Finding columns caused an error: " + e.getMessage());
		}
		return kolonList;
	}

	@Override
	public Kolon createModel(Kolon model) {
		Kolon kolon = null;
		try {
			kolon = _kolonRepo.save(model);
		} catch (Exception e) {
			throw new RuntimeException("Creating columns caused an error: " + e.getMessage());
		}
		return kolon;
	}

	@Override
	public void deleteModel(long id) {
		try {
			_kolonRepo.deleteById(id);
		} catch (Exception e) {
			throw new RuntimeException("Deleting Columns caused an error: " + e.getMessage());
		}
	}

	public List<Kolon> getColumnsByTableName(String tableName) {
		try {
			return _kolonRepo.getColumnsByTableName(tableName);
		} catch (Exception e) {
			throw new RuntimeException("Getting columns by table name caused an error: " + e.getMessage());
		}
	}

	public void updateColumnsByTableName(String tableName, String name, String tag, String datatype) {
		try {
			_kolonRepo.updateColumnsByTableName(tableName, name, tag, datatype);
		} catch (Exception e) {
			throw new RuntimeException("Updating columns by table name caused an error: " + e.getMessage());
		}
	}

	@Override
	public Kolon updateModel(String prevModelName, Kolon nextModel) {
		try {
			Kolon kolon = _kolonRepo.findByName(prevModelName);
			kolon.setDatatype(nextModel.getDatatype());
			_kolonRepo.save(kolon);
			return kolon;
		} catch (Exception e) {
			throw new RuntimeException("Updating columns caused an error: " + e.getMessage());
		}
	}

}
