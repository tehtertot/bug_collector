from django.shortcuts import render, redirect
from django.urls import reverse_lazy
from django.views import generic

from .forms import CustomRegistrationForm

class Registration(generic.CreateView):
    form_class = CustomRegistrationForm
    success_url = reverse_lazy('login')
    template_name = 'registration/signup.html'

# def woot(request):
#     return render(request, 'yippee.html')

# def process(request):
#     print(request.POST)
#     User.objects.create_user()
#     return redirect('/woot')