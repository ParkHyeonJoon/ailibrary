package com.lib.ailibrary;

import com.lib.ailibrary.domain.room.RoomImageMapper;
import com.lib.ailibrary.domain.room.RoomImageRequest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@SpringBootTest
public class RoomImageMapperTest {

    @Autowired
    RoomImageMapper roomImageMapper;

    @Test
    void save() {

        RoomImageRequest params = new RoomImageRequest();
        params.setRoomId(15);
        params.setRoomType("VR룸");
        params.setRoomFloor(5);
        params.setRoomName("VR룸1");

        String filePath = "src/main/resources/images/VR.jpg";
        byte[] bytefile = null;

        try {
            bytefile = Files.readAllBytes(new File(filePath).toPath());
        } catch (IOException e1) {
            e1.printStackTrace();
        }
        params.setImage(bytefile);

        roomImageMapper.save(params);
    }
}
