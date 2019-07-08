#!/bin/sh
mv /storage/log/waccess.log /storage/log/backup/waccess_$(date +%Y%m%d).log
mv /storage/log/werror.log /storage/log/backup/werror_$(date +%Y%m%d).log
mv /storage/log/aaccess.log /storage/log/backup/aaccess_$(date +%Y%m%d).log
mv /storage/log/aerror.log /storage/log/backup/aerror_$(date +%Y%m%d).log
mv /storage/log/zaccess.log /storage/log/backup/zaccess_$(date +%Y%m%d).log
mv /storage/log/zerror.log /storage/log/backup/zerror_$(date +%Y%m%d).log
mv /storage/log/saccess.log /storage/log/backup/saccess_$(date +%Y%m%d).log
mv /storage/log/serror.log /storage/log/backup/serror_$(date +%Y%m%d).log
