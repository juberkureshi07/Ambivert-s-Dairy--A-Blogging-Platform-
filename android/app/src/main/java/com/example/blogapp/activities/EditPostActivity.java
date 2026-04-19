package com.example.blogapp.activities;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.ProgressBar;
import android.widget.Toast;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import com.bumptech.glide.Glide;
import com.example.blogapp.R;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.storage.FirebaseStorage;
import com.google.firebase.storage.StorageReference;
import java.util.HashMap;
import java.util.Map;

public class EditPostActivity extends AppCompatActivity {
    private EditText titleEdit, contentEdit;
    private ImageView imageView;
    private Button uploadBtn, saveBtn;
    private ProgressBar progressBar;
    private Uri imageUri;
    private String postId, existingImageUrl;
    private static final int PICK_IMAGE_REQUEST = 1;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_edit_post);

        postId = getIntent().getStringExtra("postId");
        String title = getIntent().getStringExtra("title");
        String content = getIntent().getStringExtra("content");
        existingImageUrl = getIntent().getStringExtra("imageUrl");

        if (postId == null) {
            finish();
            return;
        }

        titleEdit = findViewById(R.id.edit_title);
        contentEdit = findViewById(R.id.edit_content);
        imageView = findViewById(R.id.edit_image_preview);
        uploadBtn = findViewById(R.id.edit_upload_button);
        saveBtn = findViewById(R.id.edit_save_button);
        progressBar = findViewById(R.id.edit_progress);

        titleEdit.setText(title);
        contentEdit.setText(content);
        if (existingImageUrl != null && !existingImageUrl.isEmpty()) {
            imageView.setVisibility(View.VISIBLE);
            Glide.with(this).load(existingImageUrl).into(imageView);
        }

        uploadBtn.setOnClickListener(v -> openFileChooser());
        saveBtn.setOnClickListener(v -> updatePost());
    }

    private void openFileChooser() {
        Intent intent = new Intent();
        intent.setType("image/*");
        intent.setAction(Intent.ACTION_GET_CONTENT);
        startActivityForResult(intent, PICK_IMAGE_REQUEST);
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == PICK_IMAGE_REQUEST && resultCode == RESULT_OK && data != null && data.getData() != null) {
            imageUri = data.getData();
            imageView.setVisibility(View.VISIBLE);
            imageView.setImageURI(imageUri);
            existingImageUrl = null; // New image selected
        }
    }

    private void updatePost() {
        String title = titleEdit.getText().toString().trim();
        String content = contentEdit.getText().toString().trim();

        if (TextUtils.isEmpty(title) || TextUtils.isEmpty(content)) {
            Toast.makeText(this, "Title and Content are required", Toast.LENGTH_SHORT).show();
            return;
        }

        progressBar.setVisibility(View.VISIBLE);
        if (imageUri != null) {
            StorageReference storageRef = FirebaseStorage.getInstance().getReference("posts/" + System.currentTimeMillis() + ".jpg");
            storageRef.putFile(imageUri).addOnSuccessListener(taskSnapshot -> storageRef.getDownloadURL().addOnSuccessListener(uri -> saveChanges(title, content, uri.toString()))).addOnFailureListener(e -> {
                progressBar.setVisibility(View.GONE);
                Toast.makeText(EditPostActivity.this, "Upload failed: " + e.getMessage(), Toast.LENGTH_SHORT).show();
            });
        } else {
            saveChanges(title, content, existingImageUrl);
        }
    }

    private void saveChanges(String title, String content, String imageUrl) {
        Map<String, Object> updates = new HashMap<>();
        updates.put("title", title);
        updates.put("content", content);
        updates.put("imageUrl", imageUrl);

        FirebaseFirestore.getInstance().collection("posts").document(postId).update(updates).addOnSuccessListener(aVoid -> {
            progressBar.setVisibility(View.GONE);
            Toast.makeText(EditPostActivity.this, "Post updated", Toast.LENGTH_SHORT).show();
            finish();
        }).addOnFailureListener(e -> {
            progressBar.setVisibility(View.GONE);
            Toast.makeText(EditPostActivity.this, "Error: " + e.getMessage(), Toast.LENGTH_SHORT).show();
        });
    }
}
