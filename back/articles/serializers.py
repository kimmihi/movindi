from .models import Review, ReviewComment, Movie, MovieComment, Actor
from rest_framework import serializers
from accounts.serializers import UserSerializer

class ReviewCommentSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = ReviewComment
        fields = ('content', )

class ReviewListCommentSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = ReviewComment
        fields = ('content', 'user',)

class MovieCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = MovieComment
        fields = '__all__'
        read_only_fields = ('movie', )

class ReviewListSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    reviewcomment_set = ReviewListCommentSerializer(many=True, read_only=True)
    class Meta:
        model = Review
        fields = '__all__'
        
class MovieListSerializer(serializers.ModelSerializer):
    moviecomment_set = MovieCommentSerializer(many=True, read_only=True)
    class Meta:
        model = Movie
        fields = '__all__'

class ReviewSerializer(serializers.ModelSerializer):

    reviewcomment_set = ReviewCommentSerializer(many=True, read_only=True)
    class Meta:
        model = Review
        fields = ('id', 'title', 'content', 'type', 'created_at', 'updated_at', 'reviewcomment_set', )
        
class MovieSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Movie
        fields = '__all__'

class ActorListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Actor
        fields = '__all__'