import time
from django.utils.translation import ugettext_lazy as _

from rest_framework import serializers

from utils.constants import *


class FakePaymentSerializer(serializers.Serializer):
    """
    Fake payment form serializer
    """

    PRODUCTS = (
        (FIRST_PRODUCT_NUMBER, _('Off($0)')),
        (SECOND_PRODUCT_NUMBER, _('100($50)')),
        (THIRD_PRODUCT_NUMBER, _('200($75)')),
        (FOURTH_PRODUCT_NUMBER, _('500($150)')),
        (FIFTH_PRODUCT_NUMBER, _('1000($250)')),
    )

    CRAWLS = (
        (FIRST_CRAWL_NUMBER, _('1')),
        (SECOND_CRAWL_NUMBER, _('2(2x)')),
        (THIRD_CRAWL_NUMBER, _('4(3x)')),
        (FOURTH_CRAWL_NUMBER, _('8(5x)')),
        (FIFTH_CRAWL_NUMBER, _('30(15x)')),
    )

    ACCOUNTS = (
        (FIRST_ACCOUNT_NUMBER, _('Off($0)')),
        (SECOND_ACCOUNT_NUMBER, _('1($10)')),
        (THIRD_ACCOUNT_NUMBER, _('2($17.50)')),
        (FOURTH_ACCOUNT_NUMBER, _('5($30)')),
        (FIFTH_ACCOUNT_NUMBER, _('10($50)')),
    )

    number_of_products = serializers.ChoiceField(choices=PRODUCTS)
    crawl_per_month = serializers.ChoiceField(choices=CRAWLS)
    connected_accounts = serializers.ChoiceField(choices=ACCOUNTS)

    def validate_number_of_products(self, value):
        """
        Check that the number of products more than 200
        """
        if value <= 200:
            raise serializers.ValidationError("You have more than %s products. Correct this first." % value)
        return value

    def save(self, **kwargs):
        time.sleep(2)

    def create(self, validated_data):
        pass

    def update(self, instance, validated_data):
        pass
