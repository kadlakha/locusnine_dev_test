package repository;

import java.util.List;

import domain.User;

public interface UserRepository {

	public Long insertUser(User user);
	public List<User> getUsers();
	public User getUsers(Long id);
	public Integer updateUser(User user);
}
