package com.areeb.eventbooking.common.images;

import java.io.IOException;
import java.util.Base64;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import io.imagekit.sdk.ImageKit;
import io.imagekit.sdk.exceptions.BadRequestException;
import io.imagekit.sdk.exceptions.ForbiddenException;
import io.imagekit.sdk.exceptions.InternalServerException;
import io.imagekit.sdk.exceptions.TooManyRequestsException;
import io.imagekit.sdk.exceptions.UnauthorizedException;
import io.imagekit.sdk.exceptions.UnknownException;
import io.imagekit.sdk.models.FileCreateRequest;
import io.imagekit.sdk.models.GetFileListRequest;
import io.imagekit.sdk.models.results.Result;
import io.imagekit.sdk.models.results.ResultList;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ImageService {
    private final ImageKit imageKit;

    public String uploadImage(MultipartFile file) throws IOException, InternalServerException, BadRequestException,
            UnknownException, ForbiddenException, TooManyRequestsException, UnauthorizedException {
        String base64Image = Base64.getEncoder().encodeToString(file.getBytes());

        FileCreateRequest request = new FileCreateRequest(base64Image, file.getOriginalFilename());
        request.setFolder("/uploads");

        Result result = imageKit.upload(request);
        return result.getUrl();
    }

    public Result deleteImage(String fileId) throws Exception {
        return imageKit.deleteFile(fileId);
    }

    public ResultList listImages() throws Exception {
        GetFileListRequest request = new GetFileListRequest();
        request.setLimit("10");
        request.setSkip("0");
        request.setPath("/uploads");

        return imageKit.getFileList(request);
    }

    public void validateImage(MultipartFile image) {
        if (image.isEmpty()) {
            throw new IllegalArgumentException("Image file is empty");
        }
        if (image.getSize() > 5 * 1024 * 1024) { // 5MB limit
            throw new IllegalArgumentException("Image file size exceeds the limit of 5MB");
        }
        String contentType = image.getContentType();
        if (contentType == null || !contentType.startsWith("image/")) {
            throw new IllegalArgumentException("Invalid image file type");
        }
    }
}
