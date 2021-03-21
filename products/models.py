from django.db import models


class Product(models.Model):
    name = models.CharField(
        max_length=64,
        blank=True,
        null=True,
        default=None,
    )

    price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0,
    )

    description = models.TextField(
        blank=True,
        null=True,
        default=None,
    )

    short_description = models.TextField(
        blank=True,
        null=True,
        default=None,
    )

    created = models.DateTimeField(
        auto_now_add=True,
        auto_now=False,
    )

    updated = models.DateTimeField(
        auto_now_add=False,
        auto_now=True,
    )

    is_active = models.BooleanField(
        default=True,
    )

    def __str__(self):
        return "%s, %s" % (self.price, self.name)

    class Meta:
        verbose_name = 'Товар'
        verbose_name_plural = "Товары"


class ProductImage(models.Model):
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        blank=True,
        null=True,
        default=None,
    )

    image = models.ImageField(
        upload_to='product_images/',
    )

    is_active = models.BooleanField(
        default=True,
    )

    is_main_img = models.BooleanField(
        default=False,
    )

    created = models.DateTimeField(
        auto_now_add=True,
        auto_now=False,
    )

    updated = models.DateTimeField(
        auto_now_add=False,
        auto_now=True,
    )

    def __str__(self):
        return "%s" % self.id

    class Meta:
        verbose_name = 'Фотография'
        verbose_name_plural = "Фотографии"
