package repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.List;

import javax.sql.DataSource;

import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;

import com.google.inject.Inject;

import domain.User;
import play.Logger;
import provider.DataSourceProvider;

public class UserRepositoryImpl implements UserRepository {

	JdbcTemplate databaseTemplate;
	SimpleJdbcInsert insertAccountChargesTemplate;

	@Inject
	private UserRepositoryImpl(DataSourceProvider dataSourceProvider) {
		databaseTemplate = new JdbcTemplate(dataSourceProvider.get());

		insertAccountChargesTemplate = new SimpleJdbcInsert(dataSourceProvider.get())
				.usingColumns("name", "email", "status", "role").usingGeneratedKeyColumns("id").withTableName("users");
	}

	@Override
	public Long insertUser(User user) {
		try {

			Logger.info("insertUser user " + user.toString());
			SqlParameterSource parameters = new MapSqlParameterSource().addValue("name", user.getName())
					.addValue("email", user.getEmail()).addValue("status", user.getStatus())
					.addValue("role", user.getRole());

			Number id = insertAccountChargesTemplate.executeAndReturnKey(parameters);
			return id.longValue();
		} catch (Exception e) {
			Logger.error("insertUser.AccountId:" + user.toString() + " Error: ", e);
			return -1L;
		}
	}

	@Override
	public List<User> getUsers() {

		try {

			String sql = "select id,name,email,status,role from users order by id desc;";

			List<User> userList = this.databaseTemplate.query(sql, new RowMapper<User>() {
				public User mapRow(ResultSet rs, int rowNum) throws SQLException {
					User user = new User();

					user.setEmail(rs.getString("email"));
					user.setName(rs.getString("name"));
					user.setRole(rs.getString("role"));
					user.setStatus(rs.getString("status"));
					user.setId(rs.getLong("id"));

					return user;
				}
			});

			return userList;
		} catch (Exception e) {
			Logger.error("getUsers. Error: ", e);
			return Arrays.asList();
		}
	}

	@Override
	public User getUsers(Long id) {

		try {

			String sql = "select id,name,email,status,role from users where id = ?;";

			User user = this.databaseTemplate.queryForObject(sql, new Object[] { id }
			, new RowMapper<User>() {
				public User mapRow(ResultSet rs, int rowNum) throws SQLException {
					User user = new User();

					user.setEmail(rs.getString("email"));
					user.setName(rs.getString("name"));
					user.setRole(rs.getString("role"));
					user.setStatus(rs.getString("status"));
					user.setId(rs.getLong("id"));

					return user;
				}
			});

			return user;
		} catch (Exception e) {
			Logger.error("getUsers. Error: ", e);
			return new User();
		}
	}

	public Integer updateUser(User user) {

		try {
			String sql = "UPDATE users SET name=?,email=?,role=?,status=? WHERE id=?";
			int result = this.databaseTemplate.update(sql,
					new Object[] { user.getName(), user.getEmail(), user.getRole(), user.getStatus(), user.getId() });
			return result;
		} catch (Exception ex) {
			Logger.error("updateUser", ex);
			return -1;
		}
	}
}
