def pythonshell():
    """Determine python shell

    pythonshell() returns

    'shell' (started python on command line using "python")
    'ipython' (started ipython on command line using "ipython")
    'ipython-notebook' (running in Spyder or started with "ipython qtconsole")
    'jupyter-notebook' (running in a Jupyter notebook)

    See also https://stackoverflow.com/a/37661854
    """

    from os import environ, path
    env = environ
    shell = 'shell'
    print("shell "+env.keys())
    if '_' in env.keys():
      program = path.basename(env['_'])

      if 'jupyter-notebook' in program:
          shell = 'jupyter-notebook'
      elif 'JPY_PARENT_PID' in env or 'ipython' in program:
          shell = 'ipython'
          if 'JPY_PARENT_PID' in env:
              shell = 'ipython-notebook'

    return shell
