package com.lib.ailibrary.domain.review;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.commons.text.StringEscapeUtils;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;



@Service
public class ReviewApiService {

    private final ObjectMapper objectMapper = new ObjectMapper();
    private final RestTemplate restTemplate = new RestTemplate();

    public String sendPostRequest(String review) {
        String url = "http://ec2-15-164-252-94.ap-northeast-2.compute.amazonaws.com:5001/api/review"; //http://ec2-15-164-252-94.ap-northeast-2.compute.amazonaws.com:5001/api/review http://127.0.0.1:5001/api/review

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String requestBody = "{\"reviews\": \"" + review + "\"}";

        HttpEntity<String> request = new HttpEntity<>(requestBody, headers);

        String response = restTemplate.postForObject(url, request, String.class);

        try {
            JsonNode rootNode = objectMapper.readTree(response);
            return rootNode.get("response").asText();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}