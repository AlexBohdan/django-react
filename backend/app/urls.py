from django.conf.urls import url

from app.views import *

urlpatterns = [
    url(r'^fake-payment/$', FakePayment.as_view(), name='fake_payment'),
    url(r'^number-of-products-validation/$', NumberOfProductsValidation.as_view(),
        name='number_of_products_validation'),
]
