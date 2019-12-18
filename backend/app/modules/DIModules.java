package modules;

import com.google.inject.AbstractModule;

import repository.UserRepository;
import repository.UserRepositoryImpl;
import services.CoreService;
import services.CoreServiceImpl;

public class DIModules extends AbstractModule {

	@Override
	protected void configure() {

		bind(UserRepository.class).to(UserRepositoryImpl.class);
		bind(CoreService.class).to(CoreServiceImpl.class);

	}

}
