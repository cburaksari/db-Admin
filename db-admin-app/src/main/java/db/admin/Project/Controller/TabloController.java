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
import org.springframework.web.bind.annotation.RestController;

import db.admin.Project.Models.Tablo;
import db.admin.Project.Service.TabloService;

@RestController
@RequestMapping("/tables")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class TabloController implements ICrudController<Tablo> {

	@Autowired
	private TabloService _tabloService;
	
	@Override
	@GetMapping(name = "findAllTables")
	public List<Tablo> findAll() {
		return _tabloService.findAllTables();
	}

	@Override
	@PostMapping(name = "saveTable")
	public Tablo save(@RequestBody Tablo model) {
		return _tabloService.createModel(model);
	}

	@Override
	@PutMapping(name = "updateTable",path="/{name}")
	public Tablo update(@PathVariable("name") String name, @RequestBody Tablo nextModel) {
		return _tabloService.updateModel(name,nextModel);
	}

	@Override
	@DeleteMapping(name = "deleteTable", path="/{id}")
	public void delete(@PathVariable long id) {
		_tabloService.deleteModel(id);
	}

}
