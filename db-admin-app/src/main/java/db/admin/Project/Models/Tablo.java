package db.admin.Project.Models;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.SequenceGenerator;

@Entity
@Table(name = "TABLO")
public class Tablo {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(name = "TABLO_ISMI", unique = true)
	private String name;

	@Column(name = "ACIKLAMA")
	private String description;

	@JsonManagedReference
	@Transient
	@OneToMany(mappedBy="tablo", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval=true)
	private Set<Kolon> kolonList;

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

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Set<Kolon> getKolonList() {
		return kolonList;
	}

	public void setKolonList(Set<Kolon> kolonList) {
		this.kolonList = kolonList;
	}

}
