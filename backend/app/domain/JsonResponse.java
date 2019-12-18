package domain;

import java.util.List;

public class JsonResponse<T> {
	private String action;
	private int response_code;
	private String response_message;
	private int total_size;
	private int total_pages;
	private List<T> results;

	public JsonResponse(String action, int response_code, String response_message, int total_size, List<T> results) {
		super();
		this.action = action;
		this.response_code = response_code;
		this.response_message = response_message;
		this.total_size = total_size;
		this.total_pages = 1;
		this.results = results;
	}

}
