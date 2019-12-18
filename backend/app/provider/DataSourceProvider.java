package provider;

import javax.inject.Singleton;
import javax.sql.DataSource;

import org.springframework.jdbc.datasource.DataSourceTransactionManager;

import com.google.inject.Inject;
import com.google.inject.Provider;

import play.Logger;
import play.api.db.DBApi;

public class DataSourceProvider{
	
	private final DataSource ds;
	
	@Inject
	public DataSourceProvider(DBApi dbApi) {
		DataSource ds = dbApi.database("locusnine").dataSource();
		
		this.ds = ds;
		Logger.info("DataSourceProvider Init complete.");
	}

	public DataSource get() {
		return ds;
	}
}
