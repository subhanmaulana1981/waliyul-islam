FROM php:8.2-apache

# Install required PHP extensions for WordPress
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libzip-dev \
    zip \
    unzip \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd mysqli pdo pdo_mysql zip opcache

# Enable Apache rewrite module and ensure ONLY prefork MPM is active
RUN rm -f /etc/apache2/mods-enabled/mpm_*.load /etc/apache2/mods-enabled/mpm_*.conf \
    && a2enmod mpm_prefork rewrite

# Copy project files
COPY . /var/www/html/

# Set working directory & permissions
WORKDIR /var/www/html
RUN chown -R www-data:www-data /var/www/html

EXPOSE 80

CMD ["sh", "-c", "rm -f /etc/apache2/mods-enabled/mpm_event.* /etc/apache2/mods-enabled/mpm_worker.* 2>/dev/null; a2enmod mpm_prefork rewrite 2>/dev/null; sed -i \"s/Listen 80/Listen ${PORT:-80}/g\" /etc/apache2/ports.conf; sed -i \"s/:80/:${PORT:-80}/g\" /etc/apache2/sites-available/000-default.conf; exec apache2-foreground"]