package services;

import java.util.List;

import domain.User;

public interface CoreService {

	public Long insertUser(User user);
	public List<User> getUsers();
	public User getUser(Long id);
	public Integer updateUser(User user);
}
