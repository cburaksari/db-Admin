package db.admin.Project.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import db.admin.Project.Models.Kolon;
import db.admin.Project.Service.KolonService;

@RestController
@RequestMapping("/columns")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class KolonController implements ICrudController<Kolon> {

	@Autowired
	private KolonService _kolonService;
	
	
	@Override
	@GetMapping(name="findAllColumns")
	public List<Kolon> findAll() {
		return _kolonService.findAllTables();
	}
	
	@GetMapping(name="getColumnsByTableName",path = "/getColumnsByTableName")
	public List<Kolon> getColumnsByTableName(@RequestParam String name) {
		List<Kolon> kolonList = _kolonService.getColumnsByTableName(name);
		return kolonList;
	}

	@Override
	@PostMapping(name="saveColumn")
	public Kolon save(@RequestBody Kolon model) {
		return _kolonService.createModel(model);
	}

	
	
	@PutMapping(name="updateColumnByTableName", path = "/updateKolonsByTableName")
	public String update(String tableName,String name,String tag,String datatype) {
		_kolonService.updateColumnsByTableName(tableName,name,tag,datatype);
		return "success";
	}

	@Override
	@DeleteMapping(name="deleteColumn", path="/{id}")
	public void delete(@PathVariable("id") long id) {
		_kolonService.deleteModel(id);
	}
	

	@Override
	@PutMapping(name="updateColumn")
	public Kolon update(String name, Kolon model) {
		return _kolonService.updateModel(name, model);
	}

}
