package db.admin.Project.Models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name="KOLON")
public class Kolon {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	@Column(name = "KOLON_ISMI")
	private String name;
	
	@Column(name="ETIKET")
	private String tag;
	
	@Column(name="VERI_TIPI")
	private String datatype;
	
	@JsonBackReference
	@ManyToOne
	@JoinColumn(name = "TABLO_ID")
	private Tablo tablo;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDatatype() {
		return datatype;
	}

	public void setDatatype(String datatype) {
		this.datatype = datatype;
	}

	public String getTag() {
		return tag;
	}

	public void setTag(String tag) {
		this.tag = tag;
	}

	public Tablo getTablo() {
		return tablo;
	}

	public void setTablo(Tablo tablo) {
		this.tablo = tablo;
	}
	
	
}
