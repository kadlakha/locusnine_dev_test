package controllers;

import java.util.Arrays;
import java.util.List;

import com.fasterxml.jackson.databind.JsonNode;
import com.google.inject.Inject;

import domain.JsonResponse;
import domain.User;
import play.Logger;
import play.data.Form;
import play.libs.Json;
import play.mvc.*;
import play.mvc.Controller;
import services.CoreService;

/**
 * This controller contains an action to handle HTTP requests
 * to the application's home page.
 */
public class HomeController extends Controller {

	@Inject
	CoreService coreService;
	
    /**
     * An action that renders an HTML page with a welcome message.
     * The configuration in the <code>routes</code> file means that
     * this method will be called when the application receives a
     * <code>GET</code> request with a path of <code>/</code>.
     */
    public Result index() {
        return ok(views.html.index.render());
    }
    
    
	public Result insertUser(Http.Request request) {
		
		JsonNode json = request.body().asJson();
		User user = Json.fromJson(json, User.class);
		Logger.info("insertUser. user: " + user.toString());
		
		coreService.insertUser(user);

		JsonResponse<User> jsonResponse = new JsonResponse<User>("insertUser", 1, "Success", 1, Arrays.asList());
		return ok(Json.toJson(jsonResponse));
	}

	
public Result getUsers() {
		
		
		Logger.info("GetUsers");
		
		List<User> userList = coreService.getUsers();

		JsonResponse<User> jsonResponse = new JsonResponse<User>("getUers", 1, "Success", userList.size(), userList);
		
		return ok(Json.toJson(jsonResponse));
	}

	public Result getUserById(Long id) {
		
		
		Logger.info("GetUser");
		
		User user = coreService.getUser(id);
		JsonResponse<User> jsonResponse = new JsonResponse<User>("getUserById", 1, "Success", 1, Arrays.asList(user));
		
		return ok(Json.toJson(jsonResponse));
	}

	public Result updateUser(Http.Request request) {
		
		JsonNode json = request.body().asJson();
		User user = Json.fromJson(json, User.class);
		Logger.info("insertUser. user: " + user.toString());
		
		coreService.updateUser(user);

		JsonResponse<User> jsonResponse = new JsonResponse<User>("updateUser", 1, "Success", 1, Arrays.asList());
		return ok(Json.toJson(jsonResponse));
	}


}
