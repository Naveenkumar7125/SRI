# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import google.generativeai as genai
# import base64
# import io
# from PIL import Image
# import os

# app = Flask(__name__)
# CORS(app)  # Enable CORS for all routes

# # Configure Gemini API
# GEMINI_API_KEY = "AIzaSyBgVGVc_75ZyCpbkKzjYkDMdiBY3uF3J-w"
# genai.configure(api_key=GEMINI_API_KEY)

# @app.route('/api/health', methods=['GET'])
# def health_check():
#     return jsonify({"status": "OK", "message": "Python backend is running"})

# @app.route('/api/analyze-frames', methods=['POST'])
# def analyze_frames():
#     try:
#         print("Received request to analyze frames")
        
#         # Get the API key from request (optional - using the one above)
#         api_key = request.form.get('api_key', GEMINI_API_KEY)
#         prompt = request.form.get('prompt', 'Analyze these surveillance video frames for security threats')
        
#         # Get uploaded files
#         files = request.files.getlist('frames')
        
#         if not files:
#             return jsonify({"error": "No frames provided"}), 400
        
#         print(f"Processing {len(files)} frames...")
        
#         # Initialize Gemini model
#         model = genai.GenerativeModel('gemini-1.5-flash')
        
#         # Prepare images for Gemini
#         image_parts = []
#         for i, file in enumerate(files):
#             try:
#                 # Read image file
#                 image_data = file.read()
                
#                 # Create PIL Image
#                 image = Image.open(io.BytesIO(image_data))
                
#                 # Convert to Gemini-compatible format
#                 img_byte_arr = io.BytesIO()
#                 image.save(img_byte_arr, format='JPEG')
#                 img_byte_arr = img_byte_arr.getvalue()
                
#                 image_part = {
#                     "mime_type": "image/jpeg",
#                     "data": base64.b64encode(img_byte_arr).decode('utf-8')
#                 }
#                 image_parts.append(image_part)
#                 print(f"Processed frame {i+1}")
                
#             except Exception as e:
#                 print(f"Error processing frame {i+1}: {str(e)}")
#                 continue
        
#         if not image_parts:
#             return jsonify({"error": "No valid frames could be processed"}), 400
        
#         # Create content with images and prompt
#         contents = []
#         for image_part in image_parts:
#             contents.append(image_part)
#         contents.append(prompt)
        
#         print("Sending request to Gemini API...")
        
#         # Generate content with Gemini
#         response = model.generate_content(contents)
        
#         analysis = response.text
#         print("Successfully received analysis from Gemini")
        
#         return jsonify({
#             "analysis": analysis,
#             "frames_processed": len(image_parts),
#             "status": "success"
#         })
        
#     except Exception as e:
#         print(f"Error in analyze_frames: {str(e)}")
#         return jsonify({
#             "error": "Analysis failed",
#             "details": str(e)
#         }), 500

# @app.route('/api/upload', methods=['POST'])
# def upload_video():
#     """Mock upload endpoint for compatibility"""
#     try:
#         if 'video' not in request.files:
#             return jsonify({"error": "No video file provided"}), 400
        
#         file = request.files['video']
#         if file.filename == '':
#             return jsonify({"error": "No file selected"}), 400
        
#         # For demo purposes, return mock response
#         return jsonify({
#             "message": "Video uploaded successfully",
#             "filePath": f"/uploads/{file.filename}",
#             "fileUrl": f"http://localhost:5000/uploads/{file.filename}",
#             "size": len(file.read()),
#             "timestamp": "2024-01-01T12:00:00Z"
#         })
        
#     except Exception as e:
#         return jsonify({"error": f"Upload failed: {str(e)}"}), 500

# @app.route('/api/summarize', methods=['POST'])
# def summarize_video():
#     """Mock summarize endpoint for compatibility"""
#     try:
#         data = request.get_json()
#         video_path = data.get('videoPath', '')
        
#         # Mock summary for demo
#         summary = {
#             "duration": "2m 45s",
#             "objectsDetected": 23,
#             "keyEvents": [
#                 "Person detected at 00:01:23",
#                 "Vehicle movement at 00:02:45",
#                 "Unusual activity at 00:04:12"
#             ],
#             "suspiciousActivities": [
#                 "Rapid movement in restricted area",
#                 "Loitering near entrance"
#             ],
#             "timestampHighlights": [
#                 "00:01:15 - Person enters frame",
#                 "00:02:30 - Vehicle approaches"
#             ]
#         }
        
#         return jsonify({"summary": summary})
        
#     except Exception as e:
#         return jsonify({"error": f"Summary failed: {str(e)}"}), 500

# if __name__ == '__main__':
#     print("🚀 Starting Python backend server...")
#     print("📊 Health check: http://localhost:5000/api/health")
#     print("🔮 Gemini endpoint: http://localhost:5000/api/analyze-frames")
#     app.run(host='0.0.0.0', port=5000, debug=True)

# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import google.generativeai as genai
# import base64
# import io
# from PIL import Image
# import os

# # --- IMPORTANT NOTE ON API KEYS ---
# # Hardcoding API keys like this is not recommended for production.
# # It is better practice to load the key from an environment variable (os.environ['GEMINI_API_KEY']).

# app = Flask(__name__)
# CORS(app)  # Enable CORS for all routes

# # Configure Gemini API
# # NOTE: Replace with your actual key or load from environment variable
# GEMINI_API_KEY = "AIzaSyBgVGVc_75ZyCpbkKzjYkDMdiBY3uF3J-w"
# genai.configure(api_key=GEMINI_API_KEY)

# # Define the model name globally to be accessible everywhere (Fixes the NameError)
# MODEL_NAME = 'gemini-2.5-flash'

# @app.route('/api/health', methods=['GET'])
# def health_check():
#     """Simple health check endpoint."""
#     return jsonify({"status": "OK", "message": "Python backend is running"})

# @app.route('/api/analyze-frames', methods=['POST'])
# def analyze_frames():
#     """
#     Endpoint to receive image frames and a prompt, and analyze them using the Gemini model.
#     The model has been updated from 'gemini-1.5-flash' to the stable 'gemini-2.5-flash'.
#     """
#     try:
#         print("Received request to analyze frames")
        
#         # Get the API key from request (optional - using the configured one)
#         api_key = request.form.get('api_key', GEMINI_API_KEY)
#         prompt = request.form.get('prompt', 'Analyze these surveillance video frames for security threats. Describe any detected objects, people, or suspicious activity.')
        
#         # Get uploaded files
#         files = request.files.getlist('frames')
        
#         if not files:
#             print("Error: No frames provided.")
#             return jsonify({"error": "No frames provided"}), 400
        
#         print(f"Processing {len(files)} frames...")
        
#         # Initialize Gemini model with the UPDATED, stable version
#         # Use the globally defined MODEL_NAME
#         try:
#             model = genai.GenerativeModel(MODEL_NAME)
#         except Exception as e:
#             # Handle potential model configuration errors gracefully
#             print(f"Failed to initialize model: {str(e)}")
#             return jsonify({"error": "Failed to initialize Gemini model. Check API access or model name."}), 500

#         # Prepare images for Gemini
#         image_parts = []
#         for i, file in enumerate(files):
#             try:
#                 # Read image file
#                 image_data = file.read()
                
#                 # Create PIL Image
#                 image = Image.open(io.BytesIO(image_data))
                
#                 # Convert to JPEG bytes for consistent API upload
#                 img_byte_arr = io.BytesIO()
#                 image.save(img_byte_arr, format='JPEG')
#                 img_byte_arr = img_byte_arr.getvalue()
                
#                 # The Gemini API expects parts, typically handled by the SDK
#                 # For this REST-style content, we create the dictionary payload structure
#                 # The SDK will handle the actual data conversion if passing PIL.Image objects,
#                 # but since we are handling raw bytes from flask, we'll stick to a list of parts.
                
#                 # NOTE: When using the Python SDK's `generate_content`, 
#                 # passing a list of PIL.Image objects is the simplest method.
#                 # However, since you are reading raw files and processing them to PIL.Image, 
#                 # we'll use the PIL image object directly in the contents list.
#                 image_parts.append(image)
#                 print(f"Processed frame {i+1} successfully.")
                
#             except Exception as e:
#                 # Log frame processing error but continue with other frames
#                 print(f"Error processing frame {i+1}: {str(e)}")
#                 continue
        
#         if not image_parts:
#             return jsonify({"error": "No valid frames could be processed after reading all files."}), 400
        
#         # Combine the processed image objects and the text prompt
#         # The prompt is sent last as a text part.
#         contents = image_parts + [prompt]
        
#         print(f"Sending request with {len(image_parts)} images and prompt to Gemini API...")
        
#         # Generate content with Gemini
#         response = model.generate_content(contents)
        
#         analysis = response.text
#         print("Successfully received analysis from Gemini.")
        
#         return jsonify({
#             "analysis": analysis,
#             "frames_processed": len(image_parts),
#             "status": "success",
#             "model_used": MODEL_NAME
#         })
        
#     except Exception as e:
#         # Catch any unexpected errors during the API call or main processing loop
#         print(f"Critical error in analyze_frames: {str(e)}")
#         return jsonify({
#             "error": "Analysis failed",
#             "details": str(e)
#         }), 500

# @app.route('/api/upload', methods=['POST'])
# def upload_video():
#     """Mock upload endpoint for compatibility - returns placeholder data."""
#     try:
#         if 'video' not in request.files:
#             return jsonify({"error": "No video file provided"}), 400
        
#         file = request.files['video']
#         if file.filename == '':
#             return jsonify({"error": "No file selected"}), 400
        
#         # Seek and read to get size for mock response, then reset cursor
#         file.seek(0)
#         file_size = len(file.read())
        
#         # For demo purposes, return mock response
#         return jsonify({
#             "message": "Video uploaded successfully (Mock response)",
#             "filePath": f"/uploads/{file.filename}",
#             "fileUrl": f"http://localhost:5000/uploads/{file.filename}",
#             "size": file_size,
#             "timestamp": "2024-01-01T12:00:00Z"
#         })
        
#     except Exception as e:
#         return jsonify({"error": f"Upload failed: {str(e)}"}), 500

# @app.route('/api/summarize', methods=['POST'])
# def summarize_video():
#     """Mock summarize endpoint for compatibility - returns placeholder data."""
#     try:
#         data = request.get_json()
#         video_path = data.get('videoPath', '')
        
#         # Mock summary for demo
#         summary = {
#             "duration": "2m 45s",
#             "objectsDetected": 23,
#             "keyEvents": [
#                 "Person detected at 00:01:23",
#                 "Vehicle movement at 00:02:45",
#                 "Unusual activity at 00:04:12"
#             ],
#             "suspiciousActivities": [
#                 "Rapid movement in restricted area",
#                 "Loitering near entrance"
#             ],
#             "timestampHighlights": [
#                 "00:01:15 - Person enters frame",
#                 "00:02:30 - Vehicle approaches"
#             ]
#         }
        
#         return jsonify({"summary": summary, "status": "success"})
        
#     except Exception as e:
#         return jsonify({"error": f"Summary failed: {str(e)}"}), 500

# if __name__ == '__main__':
#     print("🚀 Starting Python backend server...")
#     print("✨ Model has been updated to 'gemini-2.5-flash'.")
#     print("📊 Health check: http://localhost:5000/api/health")
#     print("🔮 Gemini endpoint: http://localhost:5000/api/analyze-frames")
#     app.run(host='0.0.0.0', port=5000, debug=True)



from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import base64
import io
from PIL import Image
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Configure Gemini API
GEMINI_API_KEY = "AIzaSyBgVGVc_75ZyCpbkKzjYkDMdiBY3uF3J-w"
genai.configure(api_key=GEMINI_API_KEY)

MODEL_NAME = 'gemini-2.0-flash-exp'  # Using a more available model

def get_current_timestamp():
    """Get current date and time in a clean format"""
    return datetime.now().strftime("%Y-%m-%d %H:%M:%S")

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        "status": "OK", 
        "message": "Backend running",
        "timestamp": get_current_timestamp()
    })

@app.route('/api/analyze-frames', methods=['POST'])
def analyze_frames():
    try:
        print(f"[{get_current_timestamp()}] Analyzing frames request received")
        
        files = request.files.getlist('frames')
        prompt = request.form.get('prompt', 'Analyze these surveillance frames. Provide a concise security summary.')
        
        if not files:
            return jsonify({
                "error": "No frames provided",
                "timestamp": get_current_timestamp()
            }), 400
        
        print(f"Processing {len(files)} frames...")
        
        model = genai.GenerativeModel(MODEL_NAME)
        
        # Prepare images
        image_parts = []
        for i, file in enumerate(files):
            try:
                image_data = file.read()
                image = Image.open(io.BytesIO(image_data))
                image_parts.append(image)
                print(f"✓ Frame {i+1} processed")
            except Exception as e:
                print(f"✗ Frame {i+1} failed: {str(e)}")
                continue
        
        if not image_parts:
            return jsonify({
                "error": "No valid frames processed",
                "timestamp": get_current_timestamp()
            }), 400
        
        # Generate concise analysis
        contents = image_parts + [prompt + " Keep response under 150 words. Be direct and actionable."]
        
        print("Sending to Gemini API...")
        response = model.generate_content(contents)
        
        analysis = response.text
        print("✓ Analysis received")
        
        return jsonify({
            "analysis": analysis,
            "frames_processed": len(image_parts),
            "timestamp": get_current_timestamp(),
            "status": "success"
        })
        
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({
            "error": "Analysis failed",
            "details": str(e),
            "timestamp": get_current_timestamp()
        }), 500

@app.route('/api/upload', methods=['POST'])
def upload_video():
    try:
        if 'video' not in request.files:
            return jsonify({"error": "No video file"}), 400
        
        file = request.files['video']
        if file.filename == '':
            return jsonify({"error": "No file selected"}), 400
        
        return jsonify({
            "message": "Video uploaded",
            "fileUrl": URL.createObjectURL(file),
            "timestamp": get_current_timestamp()
        })
        
    except Exception as e:
        return jsonify({
            "error": f"Upload failed: {str(e)}",
            "timestamp": get_current_timestamp()
        }), 500

@app.route('/api/summarize', methods=['POST'])
def summarize_video():
    try:
        data = request.get_json()
        
        summary = {
            "duration": "2m 45s",
            "objectsDetected": 23,
            "keyEvents": [
                "Person detected at 00:01:23",
                "Vehicle movement at 00:02:45"
            ],
            "suspiciousActivities": [
                "Movement in restricted area"
            ],
            "timestampHighlights": [
                "00:01:15 - Person enters frame"
            ]
        }
        
        return jsonify({
            "summary": summary, 
            "timestamp": get_current_timestamp()
        })
        
    except Exception as e:
        return jsonify({
            "error": f"Summary failed: {str(e)}",
            "timestamp": get_current_timestamp()
        }), 500

if __name__ == '__main__':
    print(f"🚀 Starting backend - {get_current_timestamp()}")
    print("📍 Health: http://localhost:5000/api/health")
    app.run(host='0.0.0.0', port=5000, debug=True)