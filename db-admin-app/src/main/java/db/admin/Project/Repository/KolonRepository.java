package db.admin.Project.Repository;

import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import db.admin.Project.Models.Kolon;
import db.admin.Project.Models.Tablo;

@Repository
public interface KolonRepository extends JpaRepository<Kolon, Long> {
	
	@Query(value = "select * from kolon where tablo_id in (select id from tablo where tablo_ismi=?1)", nativeQuery = true)
	List<Kolon> getColumnsByTableName(String tableName);
	
	@Query(value = "update kolon set name=?2,tag=?3,datatype=?4 where tablo_id in (select id from table where tablo_ismi=?1)", nativeQuery = true)
	void updateColumnsByTableName(String tableName,String name,String tag,String datatype);
	
	@Modifying
	@Query(value = "delete from kolon where tablo_id=?1", nativeQuery = true)
	void deleteColumnByTabloId(long id);

	Kolon findByName(String prevModelName);
}
