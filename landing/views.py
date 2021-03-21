from django.shortcuts import render
from .forms import SubscriberForm
from products.models import *


def landing(request):
    """
    :param request: Запрос из браузера
    :return:
    """
    form = SubscriberForm(request.POST or None)
    if request.method == "POST" and form.is_valid():
        data = form.cleaned_data

        new_form = form.save()

    return render(request, 'landing/landing.html', locals())


def home(request):
    products_images = ProductImage.objects.filter(is_active=True, is_main_img=True)
    return render(request, 'landing/home.html', locals())
