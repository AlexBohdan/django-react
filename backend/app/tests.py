from django.test import TestCase
from django.core.urlresolvers import reverse


class MainTest(TestCase):
    def test_products_validation(self):
        response_200 = self.client.post(reverse('number_of_products_validation'), {'number_of_products': '500'})
        response_422 = self.client.post(reverse('number_of_products_validation'), {'number_of_products': '100'})
        response_bad_data = self.client.post(reverse('number_of_products_validation'), {'number_of_products': '3'})
        self.assertEqual(response_200.status_code, 200)
        self.assertEqual(response_422.status_code, 422)
        self.assertEqual(response_bad_data.status_code, 422)

    def test_fake_payment(self):
        response_200 = self.client.post(reverse('fake_payment'),
                                   {'number_of_products': '500', 'connected_accounts': '10', 'crawl_per_month': '30'})
        response_422 = self.client.post(reverse('fake_payment'),
                                   {'number_of_products': '500', 'connected_accounts': '10'})
        response_bad_data = self.client.post(reverse('fake_payment'),
                                        {'number_of_products': '0', 'connected_accounts': '10',
                                         'crawl_per_month': '30'})
        self.assertEqual(response_200.status_code, 200)
        self.assertEqual(response_422.status_code, 422)
        self.assertEqual(response_bad_data.status_code, 422)
