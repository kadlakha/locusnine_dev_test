package services;

import java.util.List;

import com.google.inject.Inject;

import domain.User;
import repository.UserRepository;

public class CoreServiceImpl implements CoreService {

	@Inject
	UserRepository userRepository;
	
	@Override
	public Long insertUser(User user) {
		return userRepository.insertUser(user);
	}
	
	public List<User> getUsers() {
		return userRepository.getUsers();
	}

	public User getUser(Long id) {
		return userRepository.getUsers(id);
	}
	
	public Integer updateUser(User user){
		return userRepository.updateUser(user);
	}
}
