package db.admin.Project.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import db.admin.Project.Models.Tablo;

@Repository
public interface TabloRepository extends JpaRepository<Tablo, Long> {
	
	public Tablo findByName(String name);
}
