from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import serializers

from app.serializers import FakePaymentSerializer


class FakePayment(APIView):
    """
    FakePayment form data handler
    """

    def post(self, request):
        serializer = FakePaymentSerializer(data=self.request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_200_OK)
        else:
            return Response({'errors': serializer.errors}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class NumberOfProductsValidation(APIView):
    """
    Number of products slider validation
    """

    def post(self, request):
        value = int(self.request.data.get('number_of_products'))
        try:
            FakePaymentSerializer().validate_number_of_products(value)
            return Response(status=status.HTTP_200_OK)
        except serializers.ValidationError as exception:
            return Response({'error': exception.detail}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
