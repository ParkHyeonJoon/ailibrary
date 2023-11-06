package com.lib.ailibrary.domain.review;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.commons.text.StringEscapeUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;



@Service
public class ReviewApiService {

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private RestTemplate restTemplate;

    public String sendPostRequest(String review) {
        String url = "http://ec2-15-164-252-94.ap-northeast-2.compute.amazonaws.com:5001/api/review";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String requestBody = "{\"reviews\": \"" + review + "\"}";

        HttpEntity<String> request = new HttpEntity<>(requestBody, headers);

        String response = restTemplate.postForObject(url, request, String.class);

        try {
            JsonNode rootNode = objectMapper.readTree(response);
            String summary = rootNode.get("response").asText();
            return StringEscapeUtils.unescapeJson(summary);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }




    }
}
