package db.admin.Project.Service;

import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import db.admin.Project.Models.Kolon;
import db.admin.Project.Models.Tablo;
import db.admin.Project.Repository.KolonRepository;
import db.admin.Project.Repository.TabloRepository;

@Service
public class TabloService implements ICrudService<Tablo> {

	@Autowired
	private TabloRepository _tabloRepo;
	
	@Autowired
	private KolonRepository _kolonRepo;

	@Autowired
	private EntityManager entityManager;

	@Override
	public List<Tablo> findAllTables() {
		List<Tablo> tabloList = null;
		try {

			tabloList = _tabloRepo.findAll();
		} catch (Exception e) {
			throw new RuntimeException("Creating a tablo caused an exception: " + e.getMessage());
		}
		return tabloList;
	}

	@Override
	public Tablo createModel(Tablo model) {
		Tablo tablo = null;
		try {
			tablo = _tabloRepo.saveAndFlush(model);
			for(Kolon kolon : tablo.getKolonList()) {
				kolon.setTablo(tablo);
				_kolonRepo.save(kolon);
			}

			entityManager.joinTransaction();
			entityManager.createNativeQuery(createNativeQuery(model)).executeUpdate();
		} catch (Exception e) {
			throw new RuntimeException("Creating a tablo caused an exception: " + e.getMessage());
		}
		return tablo;
	}

	@Override
	public Tablo updateModel(String prevModelName, Tablo nextModel) {
		Tablo tablo = null;
		try {
			tablo = _tabloRepo.findByName(prevModelName);
			nextModel.setId(tablo.getId());
			_tabloRepo.save(nextModel);
			
			for(Kolon kolon : nextModel.getKolonList()) {
				kolon.setTablo(tablo);
				_kolonRepo.save(kolon);
			}
			
		} catch (Exception e) {
			throw new RuntimeException("Updating a tablo caused an exception: " + e.getMessage());
		}
		return tablo;
	}

	@Override
	public void deleteModel(long id) {
		try {
			_kolonRepo.deleteColumnByTabloId(id);
			_tabloRepo.deleteById(id);
		} catch (Exception e) {
			throw new RuntimeException("Deleting a tablo caused an exception: " + e.getMessage());
		}
	}

	public String createNativeQuery(Tablo model) {
		StringBuilder query = new StringBuilder();
		query.append("CREATE TABLE ");
		query.append(model.getName() + " (\n");
		for (Kolon kolon : model.getKolonList()) {
			query.append(kolon.getName() + " ");
			query.append(kolon.getDatatype() + ",");
		}
		query.deleteCharAt(query.length() - 1);
		query.append(")");

		return query.toString();
	}

}
