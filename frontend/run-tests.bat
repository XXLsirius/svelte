@echo off
for %%f in (UITest\*.side) do (
  call selenium-side-runner "%%f"
)
